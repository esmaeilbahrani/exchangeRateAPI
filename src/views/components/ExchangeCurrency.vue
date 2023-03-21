<template>
  <div>
    <DynamicForm :schema="formSchema" @onSubmit="getExchangeRate">
      <template v-slot:actions>
        <button type="submit" class="btn btn-primary">Get exchange rate</button>
        <button type="reset" class="btn btn-light" @click="reset()">Reset</button>
      </template>
    </DynamicForm>

    <div class="histories" v-if="histories.length>0">
      <h3 class="caption">Conversion history</h3>
      <div class="item" v-for="(i,index) in histories">{{++index}}:: {{i.from}} -> {{i.to}} ({{i.exchangeRate }})</div>
    </div>

    <div v-if="exchangeRate" class="chart">
      <Line :options="chartOptions" :data="chartData"/>
    </div>
    <Spinner v-if="isLoading"/>
    <div class="alert alert-red" v-if="!!error" v-html="error"></div>

  </div>
</template>

<script>
import axios from 'axios';
import DynamicForm from './DynamicForm.vue';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import {Line} from 'vue-chartjs'
import Spinner from './spinner.vue'
import * as Yup from "yup";
import {useHistoriesStore} from '../../stores/ChartHistories.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default {
  name: 'ExchangeCurrency',
  components: {
    Line, DynamicForm, Spinner
  },
  setup() {
    const historiesStore = useHistoriesStore();

    function addToHistory(store) {
      historiesStore.addHistory(store)
    }

    return {
      histories: historiesStore.histories,
      addToHistory,
    };
  },
  data() {
    return {
      series: [],
      isLoading: false,
      exchangeRate: null,
      error: null,
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Open',
            data: [],
            borderColor: '#3e95cd',
            fill: false
          },
          {
            label: 'High',
            data: [],
            borderColor: '#8e5ea2',
            fill: false
          },
          {
            label: 'Low',
            data: [],
            borderColor: '#3cba9f',
            fill: false
          },
          {
            label: 'Close',
            data: [],
            borderColor: '#e8c3b9',
            fill: false
          }
        ]
      },
      chartOptions: {
        responsive: true
      },
      formSchema: {
        fields: [
          {
            label: 'From currency (e.g. EUR,USD,...)',
            name: 'from',
            as: 'input',
            rules: Yup.string().length(3).required(),
          },
          {
            label: 'To currency (e.g. USD,GBP...)',
            name: 'to',
            as: 'input',
            rules: Yup.string().length(3).required(),
          },
        ],
      },
    }
  },
  methods: {
    reset() {
      this.chartData.datasets.map((e) => {
        e.data = [];
      });
      this.exchangeRate = null;
      this.error = null;
    },
    async getExchangeRate(values) {
      this.reset();
      this.isLoading = true;
      this.fromCurrency = values.from;
      this.toCurrency = values.to;
      const response = await axios.get('https://www.alphavantage.co/query', {
        params: {
          function: 'FX_DAILY',
          from_symbol: this.fromCurrency,
          to_symbol: this.toCurrency,
          apikey: '1ZFANAC1OTB3B0HQ'
        }
      });
      this.isLoading = false;
      if (!!response.data['Error Message']) {
        this.error = response.data['Error Message'] + '\n <b>You may have entered the currency symbol incorrectly</b> ';
      } else {
        this.series = response.data['Time Series FX (Daily)'];
        this.drawChart()

        const history = {
          from: this.fromCurrency,
          to: this.toCurrency,
          series: this.series,
          exchangeRate: this.exchangeRate,
          date: new Date(),
        };
        this.addToHistory(history);
      }
    },
    drawChart() {
      const labels = Object.keys(this.series).reverse();
      const openData = [];
      const highData = [];
      const lowData = [];
      const closeData = [];
      for (let i = 0; i < labels.length; i++) {
        const data = this.series[labels[i]];
        openData.push(data['1. open']);
        highData.push(data['2. high']);
        lowData.push(data['3. low']);
        closeData.push(data['4. close']);
      }
      this.chartData.labels = labels;
      this.chartData.datasets[0].data = openData;
      this.chartData.datasets[1].data = highData;
      this.chartData.datasets[2].data = lowData;
      this.chartData.datasets[3].data = closeData;
      this.exchangeRate = parseFloat(closeData[0]).toFixed(2);
    },
  },
}
</script>

<template>
    <h1>{{hello}}</h1>
</template>
<script>
//    import { AVAILABLE_CURRENCIES_QUERY, RATES_QUERY } from './graphql'
    import gql from "graphql-tag";
    export default {
        name: 'app',
        data () {
            return {
                hello:'',
                availableCurrencies: [],
                loading: 0,
                rates: [],
                selectedCurrency: 'USD'
            }
        },
        computed: {
            loadingRates () {
                return !!this.loading
            }
        },
        apollo: {
//            $loadingKey: 'loading',
            hello: gql`{hello}`

//            rates: {
//                query: RATES_QUERY,
//                variables () {
//                    return {
//                        currency: this.selectedCurrency
//                    }
//                }
//            }
        },
//  created(){
//          console.log(this.$apollo.query)
//          this.$apollo.query(
//              {
//              query: AVAILABLE_CURRENCIES_QUERY,
//          })
//              .then(res => {
//                  console.log('***')
//                  this.Parse(res.data.erSeasons)
//                  console.log('((((',res.data)
//              })
//              .catch(err => {
//                  console.log(err)
//              })
//      }
    }
</script>
import {LightningElement,api, wire, track} from 'lwc';
import {loadScript } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/chart';
import getNationalData from '@salesforce/apex/COVIDDataService.getNationalData';
import getStateData from '@salesforce/apex/COVIDDataService.getStateData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'


export default class COVID19PatientChart extends LightningElement {
    @api chartjsInitialized = false;
    @api recordId;
    @api nationalTotal;
    @api nationaldata;
    @api stateData;
    error;
    @track states = [];
    stateNames = [];
    @track dataEle = [];
    values = [];
    colors=[];

     @wire (getNationalData) wiredData({error, data}){
         if(data){
             let result = data;
                console.log(result);
                var statedata = result.statewise.filter(function(el) {
                    return el.state != 'Total';
                });
                
                if (statedata != undefined) {
                    this.nationaldata = statedata;
                }

                for (var key in this.nationaldata) {
                   if(result.statewise[key].state!='Total' && result.statewise[key].confirmed>0)
                   {
                    this.stateNames.push(result.statewise[key].state);
                    this.values.push(result.statewise[key].confirmed);
                    this.colors.push('rgba('+(255-(parseInt(key)*2))+', 0, 22, 1)');
                    //console.log(result.statewise[key]+" "+result.statewise[key].state+" "+result.statewise[key].confirmed);
                   }
                }
                console.log("first :"+this.stateNames);
                console.log("second :"+this.values);
                Promise.all([
                    loadScript(this, chartjs)
                ])
                .then(() => {
                    this.Initializechartjs();
                })
                .catch(err => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error loading chartJs',
                            message: err.message,
                            variant: 'error'
                        })
                    );
                });
            }
            if(error){
                this.error = error;
                console.log(JSON.stringify(error));
            }
    }

    renderedCallback() {
       
        if (this.chartjsInitialized) {
            return;
        }
        this.chartjsInitialized = true;
        console.log('chartjs loading');
      
    }

    Initializechartjs() {
        //Get the context of the canvas element we want to select
        console.log(this.stateNames);
        console.log(this.values);
        var ctx = this.template.querySelector(".chart");
        var lineChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.stateNames,
                datasets: [{
                    label: 'States',
                    backgroundColor: this.colors,
                    data: this.values,
                    borderColor: 'rgba(121, 159, 222, 1)',
                    fill: true,
                    pointBackgroundColor: "#26B99A",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointRadius: 2,
                    bezierCurve: true,
                    pointHitRadius: 10
                }]
            },
            options: {
                legend: {
                    position: 'top',
                    padding: 10,
                },
                scales: {
                    xAxes: [
                        {
                            beginAtZero: true,
                            ticks: {
                                autoSkip: false
                            }
                        }
                    ]
                },
                responsive: true
            }
        });
    }
}
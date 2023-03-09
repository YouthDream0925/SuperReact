import { async } from 'q';
import * as React from 'react';
import {useState, useEffect, useMemo} from "react";
import api from "../../../utils/api.js";
import {ethers} from "ethers";
import Tracker from './components/Tracker';
import { makeStyles } from '@material-ui/core/styles';
import Widget1 from './widgets/Widget1';

const useStyles = makeStyles({
    root: {
      width: '100%',
      minWidth: 275
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});

export default function GasTracker() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const test = {
        id: 'widget1',
        series: {          
          Analytics: [
            {
              name: 'Gas Price',
              data: [1,2,3],
              fill: 'start'
            }
          ]
        },
        options: {
          chart: {
            type: 'area',
            height: '100%',
            background: 'transparent',
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            }
          },
          theme: {
            mode: 'dark'
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: ['1', '2', '3'],
            tooltip: {
              enabled: false
            },
            axisBorder: {
              show: false
            }
          },
          yaxis: {
            axisBorder: {
              show: false
            }
          },
          markers: {
            size: 1,
            strokeWidth: 1.5,
            strokeOpacity: 1,
            strokeDashArray: 0,
            fillOpacity: 1,
            shape: 'circle',
            radius: 2,
            hover: {
              size: 5
            }
          },
          fill: {
            type: 'solid',
            opacity: 0.7,
            gradient: {
              shadeIntensity: 0.4,
              opacityFrom: 1,
              opacityTo: 0.5,
              stops: [30, 100, 100]
            }
          },
          grid: {
            show: true,
            strokeDashArray: 1,
            position: 'back',
            xaxis: {
              lines: {
                show: true
              }
            },
            yaxis: {
              lines: {
                show: true
              }
            },
            padding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }
          },
          stroke: {
            show: true,
            curve: 'smooth',
            lineCap: 'butt',
            width: 1.5,
            dashArray: 0
          }
        }
    };

    const [isLoaded, setIsLoaded] = useState(0);
    const [widget, setWidget] = useState(test);

    useEffect(async () => {
        const getGasPrice = (await api.get(`/getGasPrice`)).data.gasPrice;
        const getGasPrices = (await api.get(`/getLatestGasPrices`)).data;
        const lastBlockNumber = (await api.get(`/getLastConfirmedBlockNumber`)).data.responseData;
        const temp = [
            {
                icon: '',
                level: 'Low',
                color: '#08a584',
                value: `${getGasPrice + 1}`,
                unit: 'wei',
                stringOne: 'Base: 27 | Priority: 1',
                stringTwo: '$0.89 | ~ 10 mins: 0 secs'
            },
            {
                icon: '',
                level: 'Low',
                value: '1',
                color: '#0974b3',
                unit: 'Gwei',
                stringOne: 'Base: 27 | Priority: 2',
                stringTwo: '$0.92 | ~ 3 mins: 0 secs'
            },
            {
                icon: '',
                level: 'Low',
                value: '2',
                color: '#8a2124',
                unit: 'Gwei',
                stringOne: 'Base: 27 | Priority: 3',
                stringTwo: '$0.96 | ~ 30 secs'
            }
        ];

        let categories = [];
        for(let i=lastBlockNumber-50; i<=lastBlockNumber; i++) {
            categories.push(i);
        }

        const widget1 = {
            id: 'widget1',
            series: {          
              Analytics: [
                {
                  name: 'Gas Price',
                  data: getGasPrices,
                  fill: 'start'
                }
              ]
            },
            options: {
              chart: {
                type: 'area',
                height: '100%',
                background: 'transparent',
                toolbar: {
                  show: false
                },
                zoom: {
                  enabled: false
                }
              },
              theme: {
                mode: 'dark'
              },
              dataLabels: {
                enabled: false
              },
              xaxis: {
                categories: categories,
                tooltip: {
                  enabled: false
                },
                axisBorder: {
                  show: false
                }
              },
              yaxis: {
                axisBorder: {
                  show: false
                }
              },
              markers: {
                size: 1,
                strokeWidth: 1.5,
                strokeOpacity: 1,
                strokeDashArray: 0,
                fillOpacity: 1,
                shape: 'circle',
                radius: 2,
                hover: {
                  size: 5
                }
              },
              fill: {
                type: 'solid',
                opacity: 0.7,
                gradient: {
                  shadeIntensity: 0.4,
                  opacityFrom: 1,
                  opacityTo: 0.5,
                  stops: [30, 100, 100]
                }
              },
              grid: {
                show: true,
                strokeDashArray: 1,
                position: 'back',
                xaxis: {
                  lines: {
                    show: true
                  }
                },
                yaxis: {
                  lines: {
                    show: true
                  }
                },
                padding: {
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0
                }
              },
              stroke: {
                show: true,
                curve: 'smooth',
                lineCap: 'butt',
                width: 1.5,
                dashArray: 0
              }
            }
        };
        setWidget(widget1);
        setData(temp);
        setIsLoaded(1);
    }, []);

    return (
        <>
            <div className='gas-tracker'>
                {
                    data.map((element) => (
                        <Tracker data = {element} />
                    ))
                }
            </div> 
            <div style={{padding: '2rem'}}>
                {
                    isLoaded == 1 ?
                    <Widget1 data={widget} />
                    :
                    <div></div>
                }
            </div>
        </>
    );
}
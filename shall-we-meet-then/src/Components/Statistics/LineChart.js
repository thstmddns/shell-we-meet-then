import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { ResponsiveLine } from '@nivo/line'
import {
    getMyInfoApi,
    getTotalUserArticleCountApi,
    getGroupArticleCountApi 
} from '../../api/MemoryApi.js'
import { Ldata } from './Ldata.js';

const MyResponsiveLine = () => {
    const { groupSeq } = useParams()
    const [nickname, setNickname] = useState('')
    const [lineChartData, setLineChartData] = useState([])
    useEffect(() => {
        getMyInfoApi({ groupSeq })
            .then(res => {
            // console.log(res.data);
            setNickname(res.data.nickname)
            })
            .catch(err => {
            console.error(err);
            })
    }, [])
    useEffect(() => {
        getTotalUserArticleCountApi({groupSeq})
            .then(res => {
                // console.log(res.data);
                const lineData = res.data.map(obj => {
                    const count = obj.count
                    const createDate = obj.createDate
                    return {
                        x : createDate,
                        y : count
                    }
                })
                const lineDataObj = [{
                    id : nickname,
                    data : lineData
                }]
                // console.log(lineDataObj);
                setLineChartData(lineDataObj)
            })
            .catch(err => {
                console.error(err);
            })
    }, [nickname])
  return (
    <div style={{ width: '480px', height: '240px'}}>
    <ResponsiveLine
        data={lineChartData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: '0',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        // yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'date',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    </div>
  )
}

export default MyResponsiveLine
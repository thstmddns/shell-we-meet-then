import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { ResponsiveCalendar } from '@nivo/calendar'
import {
    getTotalUserArticleCountApi,
    getGroupArticleCountApi 
} from '../../api/MemoryApi.js'
import {Cdata} from './Cdata' 

const Calendarchart = (props) => {
    const { groupSeq } = useParams()
    const [calendarChartData, setCalendarChartData] = useState([])
    useEffect(() => {
        getTotalUserArticleCountApi({groupSeq})
            .then(res => {
                // console.log(res.data);
                const calendarData = res.data.map(obj => {
                    const count = obj.count
                    const createDate = obj.createDate
                    return {
                        day : createDate,
                        value : count
                    }
                })
                // console.log(calendarData);
                setCalendarChartData(calendarData)
            })
            .catch(err => {
                console.error(err);
            })
    }, [])
    return (
        // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
        <div style={{ width: '900px', height: '200px', margin: '0 auto' }}>
        <ResponsiveCalendar
            theme= {{
                textColor: '#ffffffff',
            }}
            data={calendarChartData}
            from="2022-01-01"
            to="2022-12-31"
            emptyColor="#eeeeee"
            colors={[ '#ff99ff', '#ff66ff', '#ff33ff', '#ff00ff' ]}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={40}
            monthBorderColor="rgba(0, 0, 0, 0.1)"
            dayBorderWidth={2}
            dayBorderColor="#ffffff"
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'row',
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: 'right-to-left'
                }
            ]}
        />
        </div>
    );
};

export default Calendarchart;
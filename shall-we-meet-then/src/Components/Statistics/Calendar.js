import * as React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar'

const Piechart = (props) => {
    return (
        // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
        <div style={{ width: '1200px', height: '500px', margin: '0 auto' }}>
        <ResponsiveCalendar
          data={props.data}
          from="2015-03-01"
          to="2015-07-12"
          emptyColor="#eeeeee"
          colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
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

export default Piechart;
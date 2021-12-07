/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, {PureComponent} from 'react';
import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    Legend,
    ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];
const DashboardTestCnt = ({data}) => {
    return (
        <>
            <div style={{width: '100%', height: 300}}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            // cx={150}
                            // cy={100}
                            innerRadius={60}
                            outerRadius={90}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>{' '}
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default DashboardTestCnt;

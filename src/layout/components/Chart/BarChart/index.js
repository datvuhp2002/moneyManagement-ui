import React, { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend,ResponsiveContainer } from "recharts";
const BarChartLayout = ({data}) => {
    return (
    <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="thu" fill="rgb(106, 191, 106)" />
            <Bar dataKey="chi" fill="#FF5733" />
        </BarChart>
    </ResponsiveContainer>

    );
}
export default BarChartLayout;
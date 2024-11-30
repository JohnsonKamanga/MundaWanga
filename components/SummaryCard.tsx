import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Colors } from '@/constants/Colors';
import { PieChart } from 'react-native-chart-kit';

const { width: screenWidth } = Dimensions.get('window');

export default function SummaryCard() {
  const { colorScheme } = useColorScheme();
  const color = Colors[colorScheme ?? 'dark'];

  const income = 500000;
  const expenses = 200000;

  const chartData = [
    {
      name: 'Income',
      population: income,
      color: color.barColor, 
      legendFontColor: color.text,
      legendFontSize: 15,
    },
    {
      name: 'Expenses',
      population: expenses,
      color: 'red', 
      legendFontColor: color.text,
      legendFontSize: 15,
    },
  ];

  return (
    <View
      style={{
        backgroundColor: color.bg,
        borderColor: color.borderColor,
      }}
      className="border rounded-lg p-4 mb-4"
    >
      <Text style={{ color: color.text }} className="font-bold text-2xl mb-2">
        Financial Summary
      </Text>


      <PieChart
        data={chartData}
        width={screenWidth * 0.9} 
        height={110} 
        chartConfig={{
          backgroundColor: color.bg,
          backgroundGradientFrom: color.bg,
          backgroundGradientTo: color.bg,
          color: () => color.text,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="1"
      />

      <View className="flex-row justify-around mt-4">
        <View className="flex-row items-center">
          <View
            className="w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: color.barColor }}
          />
          <Text style={{ color: color.text }} className="text-sm">
            Income
          </Text>
        </View>
        <View className="flex-row items-center">
          <View
            className="w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: 'red' }}
          />
          <Text style={{ color: color.text }} className="text-sm">
            Expenses
          </Text>
        </View>
      </View>
    </View>
  );
}

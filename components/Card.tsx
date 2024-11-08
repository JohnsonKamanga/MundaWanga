import { useColorScheme } from "nativewind";
import React from "react";
import { StyleSheet, Text, View } from "react-native";


interface TCardHeader {
  content: string;
  textClassName?: undefined | string;
  containerClassName?: string;
  children?: React.ReactNode;
}

export function CardHeader(props: TCardHeader) {
  return (
    <View className={props.containerClassName}>
      <Text className={props?.textClassName + " font-bold text-2xl"}>{props.content}</Text>
    </View>
  );
}

interface TCardBody {
  children: React.ReactNode;
  className?: string;
}

export function CardBody(props: TCardBody) {
  return <View className={props?.className}>{props.children}</View>;
}

interface TCardFooter {
  className?: string;
  children: React.ReactNode;
}

export function CardFooter(props: TCardFooter){

  return(
    <View className={props?.className}>
      {props.children}
    </View>
  )
}

interface TCard {
  className?: string;
  children: React.ReactNode;
}

export function Card(props: TCard) {

  return <View
  style={{
    borderColor: 'rgba(0,0,0,0.1)'
  }}
  className={props?.className + ` bg-white dark:bg-[#004042] p-4 w-[95%] rounded-xl border-[1px] shadow-black dark:shadow-white shadow-xl`}>{props.children}</View>;
}

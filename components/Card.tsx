import React from "react";
import { StyleSheet, Text, View } from "react-native";


interface TCardHeader {
  content: string;
  className?: undefined | string;
}

export function CardHeader(props: TCardHeader) {
  return (
    <View>
      <Text className={props?.className + " font-bold text-2xl"}>{props.content}</Text>
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
  

  return <View className={props?.className + " bg-white p-4 w-[95%] rounded-xl border-gray-500 border-[2px]"}>{props.children}</View>;
}

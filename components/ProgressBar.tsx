import { View } from "react-native";

interface TProgressBar {
    divisor: number;
    dividend: number;
    
  }
  
  export function ProgressBar(props: TProgressBar){
    const percentage = (props.dividend / props.divisor) * 100;
    let bgColor = '#2cba00';
    if(percentage > 80){
      bgColor = '#ff0000';
    }
    else if(percentage > 61){
      bgColor = '#ffa700';
    }
    else if(percentage > 41){
      bgColor = '#fff400';
    }
    else if(percentage > 21) {
      bgColor = '#a3ff00';
    }
  
      return(
        <View style={{
          height: 7,
          width: "100%",
          backgroundColor: 'rgb(30,45,100)',
          borderRadius: 4,
          marginVertical: 10,
        }}>
          <View
          style={{
            backgroundColor: `${bgColor}`,
            width: `${percentage}%`,
            height: 7,
            borderRadius: 4,
          }}
          />
        </View>
      )
  }
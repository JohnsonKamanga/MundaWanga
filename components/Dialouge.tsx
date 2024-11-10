import { Button, Text, View } from "react-native";

type TDialougeContent = {
  content: string;
};

type stateSetter = (input: boolean)=>void;
type voidFn = ()=>void;
export function DialougeContent({ content }: TDialougeContent) {

  return (
    <View>
      <Text>{content}</Text>
    </View>
  );
}

interface TDialougeTrigger {
  setOpen: stateSetter;
};
export function DialougeTrigger(props: TDialougeTrigger) {

  return (
    <Button
    {...props}
      onPress={() => {
        props.setOpen(true);
      }}
      title="open"/>
  );
}

interface TDialougeAction {
  title: string;
  onClick: voidFn;
};

export function DialougeAction(props: TDialougeAction) {


  return (
    <Button {...props}/>
  );
}

interface TDialougeClose {
  close: stateSetter;
  title: string;
};
export function DialougeClose(props: TDialougeClose) {
 

  return (
    <Button {...props} onPress={()=>{
      props.close(false);
    }}/>
  );
}

interface TDialouge {
  open: boolean;
  setOpen: stateSetter;
  children: any;

};
export function Dialouge(props: TDialouge) {
 
  const ReturnedComponent = props.open ? (
    <View {...props}/>
  ) : (
    <View>
      <DialougeTrigger setOpen={props.setOpen} />
    </View>
  );

  return ReturnedComponent;
}

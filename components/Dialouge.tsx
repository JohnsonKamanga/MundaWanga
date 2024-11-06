import { styled } from "nativewind";
import { Button, Text, View } from "react-native";

type TDialougeContent = {
  content: string;
};

type stateSetter = (input: boolean)=>void;
type voidFn = ()=>void;
export function DialougeContent({ content }: TDialougeContent) {
  const StyledView = styled(View);
  const StyledText = styled(Text);

  return (
    <StyledView>
      <StyledText>{content}</StyledText>
    </StyledView>
  );
}

interface TDialougeTrigger {
  setOpen: stateSetter;
};
export function DialougeTrigger(props: TDialougeTrigger) {
  const StyledButton = styled(Button);
  return (
    <StyledButton
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
  const StyledButton = styled(Button);

  return (
    <StyledButton {...props}/>
  );
}

interface TDialougeClose {
  close: stateSetter;
  title: string;
};
export function DialougeClose(props: TDialougeClose) {
  const StyledButton = styled(Button);

  return (
    <StyledButton {...props} onPress={()=>{
      props.close(false);
    }}/>
  );
}

interface TDialouge {
  open: boolean;
  setOpen: stateSetter;
  children;

};
export function Dialouge(props: TDialouge) {
  const StyledView = styled(View);
  const ReturnedComponent = props.open ? (
    <StyledView {...props}/>
  ) : (
    <StyledView>
      <DialougeTrigger setOpen={props.setOpen} />
    </StyledView>
  );

  return ReturnedComponent;
}

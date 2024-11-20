import { IonIconsTypes } from "@/constants/IonIcons";
import { Ionicons } from "@expo/vector-icons";
import { Modal, ModalProps, Pressable, PressableProps, Text, View } from "react-native";
import React from 'react';

interface TDialougeContent extends ModalProps {
  children?: React.ReactNode;
};

type stateSetter = (input: boolean)=>void;
type voidFn = ()=>void;

export function DialougeContent(props: TDialougeContent) {
 const {children, className, visible, onRequestClose, ...otherProps} = props;
  return (
    <Modal className={className + " "} {...otherProps}
    // visible={open}
    // onRequestClose={() => {
    //   setOpen(!open);
    // }}
    transparent
    animationType="fade"
    >
      {children}
    </Modal>
  );
}

interface TDialougeTrigger extends IonIconsTypes{
  setOpen: stateSetter;
}
export function DialougeTrigger(props: TDialougeTrigger) {
  const {className, name, setOpen, ...otherProps} = props;
  return (
    <Pressable
    {...otherProps}
    className={className + " border-[1px] bg-[#006466] p-3 rounded-full absolute bottom-[240px] right-[33px]"}
      onPress={() => {
        setOpen(true);
      }}>
        <Ionicons name={name? name : 'add'} color="white" size={35}/>
      </Pressable>
  );
}

interface TDialougeAction extends PressableProps {
  onClick: voidFn;
};

export function DialougeAction(props: TDialougeAction) {
  const {onClick, className, ...otherProps} = props;
  return (
    <Pressable 
    onPress={onClick} 
    className={className + " "}
    {...otherProps}/>
  );
}

interface TDialougeClose extends PressableProps {
  close: stateSetter;
};

export function DialougeClose(props: TDialougeClose) {
  const {className, close , ...otherProps} = props;
  return (
    <Pressable className={className} {...otherProps} onPress={()=>{
      close(false);
    }}/>
  );
}

interface TDialouge {
  open: boolean;
  setOpen: stateSetter;
  children: React.ReactNode;

};

export function Dialouge(props: TDialouge) {
  const {children, ...otherProps} = props;
  const ReturnedComponent = props.open ? (
    <View {...otherProps}>
      {
        React.Children.map(children, (child) => {
          const newProps= {};
          return React.cloneElement(child, newProps);
        })
      }
    </View>
  ) : (
    <View>
      <DialougeTrigger setOpen={props.setOpen} />
    </View>
  );

  return ReturnedComponent;
}

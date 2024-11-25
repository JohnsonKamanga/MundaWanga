import { TBudget } from "@/model/finances/budget";
import { Pressable, Text, View } from "react-native";
import { Dialog, PaperProvider } from "react-native-paper";

export function DeleteBudgetDialog({visible, setVisible, targetBudget}: {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    targetBudget: TBudget;
}){

    return(
        <PaperProvider>
        <View>
            <Dialog visible={!visible} onDismiss={()=>{
                setVisible(false);
            }}>
                <Dialog.Title>
                    <Text>
                        Delete Budget
                    </Text>
                </Dialog.Title>
                <Dialog.Content>
                    <View>
                    <Text>
                        Are you sure you want to delete the budget?
                    </Text>
                    </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Pressable
                    onPress={()=>{

                    }}
                    >
                        <Text>
                            Accept
                        </Text>
                    </Pressable>
                    <Pressable>
                        <Text>
                            Cancel
                        </Text>
                    </Pressable>
                </Dialog.Actions>
            </Dialog>
        </View>
        </PaperProvider>
    )
}
import React from 'react'
import EqualSplitCard from './EqualSplitCard';
import PercentageSplitCard from './PercentageSplitCard';
import SharesSplitCard from './SharesSplitCard';
import AdjustmentSplitCard from './AdjustmentSplitCard';
import ManualSplitCard from './ManualSplitCard';
import { useAtom,useAtomValue } from "jotai";
import {totalExpenseAmountAtom,participantShareListAtom} from "../../atoms/ExpenseAtom";

const splitTyprComponenets ={
    Equal:EqualSplitCard,
    Percentage:PercentageSplitCard,
    Shares:SharesSplitCard,
    Adjustment:AdjustmentSplitCard,
    Manual:ManualSplitCard
}

const CreateUserSplits = ({splitType}) => {
  const [splitList,setSplitList] = useAtom(participantShareListAtom);
  const totalAmount = useAtomValue(totalExpenseAmountAtom);

    const SplitComponent = splitTyprComponenets[splitType];
  return (
   <>
    <SplitComponent splitList={splitList} setSplitList={setSplitList}  totalAmount={totalAmount} />

   </>
  )
}

export default CreateUserSplits

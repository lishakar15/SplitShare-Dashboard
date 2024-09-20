import { FaEquals } from "react-icons/fa";
import { FaPercentage } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { TbPlusMinus } from "react-icons/tb";
import { FaCalculator } from "react-icons/fa";


const splitTypeIconMap = new Map();
splitTypeIconMap.set("EQUAL", <FaEquals />);
splitTypeIconMap.set("PERCENTAGE", <FaPercentage />);
splitTypeIconMap.set("SHARES", <GrMoney />);
splitTypeIconMap.set("ADJUSTMENT", <TbPlusMinus />);
splitTypeIconMap.set("MANUAL", <FaCalculator />);

const splitTypeTextMap = new Map();
splitTypeTextMap.set("EQUAL", "equally");
splitTypeTextMap.set("PERCENTAGE", "by percentage");
splitTypeTextMap.set("SHARES", "by shares");
splitTypeTextMap.set("ADJUSTMENT", "by adjustment");
splitTypeTextMap.set("MANUAL", "manually");

export const getSplitTypeIcon = (splitType) => {
    return splitTypeIconMap.get(splitType);
} 

export const getSplitTypeText = (splitType) => {
    return splitTypeTextMap.get(splitType);
}

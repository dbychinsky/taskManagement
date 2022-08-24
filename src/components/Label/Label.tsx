import React, {FC} from "react";
import "./Label.scss";

interface ILabelProps {
    text: string
}

const Label: FC<ILabelProps> = ({text}) => {
    return (
        <label className="label">
            {text}
        </label>
    )
}

export default Label;

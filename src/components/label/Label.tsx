import React, {FC} from "react";
import "./Label.scss";

/**
 * Компонент Label
 */

type ILabelProps = {
    text: string
}

const Label: FC<ILabelProps> = (
    {
        text
    }) => {
    return (
        <label className="label">
            {text}
        </label>
    )
}

export default Label;

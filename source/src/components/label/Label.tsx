import React, {FC} from "react";
import "./Label.scss";

/**
 * Компонент Label
 */
type ILabelProps = {

    /**
     * Текст
     */
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

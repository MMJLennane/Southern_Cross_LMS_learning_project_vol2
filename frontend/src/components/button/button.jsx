import "./button.css";

const variantClassNames = {
    primary: "button-primary",
    outline: "button-outline",
    quiet: "button-quiet",
    text: "button-text",
};

export default function Button({
    children,
    variant = "primary",
    className = "",
    fullWidth = false,
    type = "button",
    ...props
}) {
    const variantClassName = variantClassNames[variant] ?? "button-primary";
    const classes = [
        "button",
        variantClassName,
        fullWidth ? "button-full-width" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");
    
    return (
        <button className={classes} type={type} {...props}>
            {children}
        </button>
    );
}
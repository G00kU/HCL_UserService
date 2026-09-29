const Button = ({ children, className = "", ...props }) => {
    return (
        <button
            className={`
        px-4
        py-2
        rounded-md
        font-medium
        transition-colors
        cursor-pointer
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
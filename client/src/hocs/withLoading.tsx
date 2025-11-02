import React from 'react';

interface WithLoadingProps {
    isLoading: boolean;
}

// Loading spinner component
const LoadingSpinner = () => (
    <div className="loading-spinner">
        <div className="spinner"></div>
    </div>
);

export function withLoading<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
    return function WithLoadingComponent(
        props: P & WithLoadingProps
    ) {
        const { isLoading, ...componentProps } = props;

        if (isLoading) {
            return <LoadingSpinner />;
        }

        return <WrappedComponent {...(componentProps as P)} />;
    };
}

// Usage example:
// const ComponentWithLoading = withLoading(YourComponent);
// <ComponentWithLoading isLoading={loading} {...otherProps} />
import { branch, renderComponent } from 'recompose';

export const renderWhileLoading = (component, propName = 'data') => branch(
    props => props[propName] && props[propName].loading,
    renderComponent(component)
)

export const renderOnError = (component, propName = 'data') => branch(
    props => props[propName] && props[propName].error,
    renderComponent(component)
)
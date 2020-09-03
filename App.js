import * as React from 'react';
import { Provider as AntdProvider } from '@ant-design/react-native'
import store from './redux/store'
import { Provider } from 'react-redux'
import Main from './pages/Main'
class App extends React.Component {

    render() {

        return (
            <Provider store={store}>
                <AntdProvider>
                    <Main />
                </AntdProvider>
            </Provider>
        )
    }
}

export default App
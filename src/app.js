import { AppRegistry } from 'react-native'

import Application from './components/Application'

import Debug from 'debug'
let debug = Debug('wt:app')
Debug.enable('wt:*')

AppRegistry.registerComponent('WebpackTemplate', () => Application)

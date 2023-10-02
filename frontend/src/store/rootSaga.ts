import {all} from "redux-saga/effects"
import taskWatcher from "./tasks/saga"
import projectWatcher from "./project/saga"

export default function* rootWatcher() {
    yield all([taskWatcher(),projectWatcher()])
}

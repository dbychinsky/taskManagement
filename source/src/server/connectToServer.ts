import config from "../configApp.json";
import {BackendServer} from "./backendServer/BackendServer";
import {StubServer} from "./stubServer/StubServer";

/**
 * Функция определяющая с каким видом сервера будет
 * работать приложение. Выбор происходит в файле
 * configApp.json указанием названия:
 * "server": "BackendServer" - удаленный сервер
 * "server": "StubServer" - сервер localStorage
 *
 * @return BackendServer||StubServer
 */
export function connectToServer() {
    if (config.server === "BackendServer") {
        return new BackendServer()
    } else {
        return new StubServer()
    }
}
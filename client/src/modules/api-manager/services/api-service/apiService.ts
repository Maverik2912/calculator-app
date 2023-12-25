import axios from "axios";

import {baseURL} from "../../constants";


export const apiService = axios.create({baseURL});
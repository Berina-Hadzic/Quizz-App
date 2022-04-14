import axios from "axios";

export default axios.create({
    baseURL:"https://opentdb.com/api.php?amount=5&category=9&type=multiple"
})
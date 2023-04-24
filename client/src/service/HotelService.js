import axios from "axios";

export class HotelService {
  static CreateHotel(data) {
    var dataURL = "http://localhost:5000/api/v1/hotel/";

    return axios.post(dataURL, data);
  }
}

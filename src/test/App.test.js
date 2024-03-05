import { MemoryRouter } from "react-router-dom"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import CancelledOrders from "../components/CancelledOrders"
import TimeTaken from "../components/TimeTaken"
import Header from "../components/Header"
import dayjs from "dayjs";

const mockStore = configureStore();
const initialState = {
    number: 10,
    startDate : dayjs('2022-01-01'),
    endDate : dayjs(),
    isAscending : false
}

describe("TimeTaken", () => {
    const store = mockStore(initialState);

  it("renders TimeTaken component without any error", async() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <TimeTaken />
        </MemoryRouter>
      </Provider>
    )
  })
})

describe("CancelledOrders", () => {
    const store = mockStore(initialState);
    it("renders CancelledOrders component without any error", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CancelledOrders />
        </MemoryRouter>
      </Provider>
    )
    })
})

describe("SideBar", () => {
    const store = mockStore(initialState);
  it("renders the header without any error", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    )
  })

  it("renders sidebar drawer without any error", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    )
  })
})

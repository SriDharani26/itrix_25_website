import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/home"
import Events from "./pages/events"
import Contact from "./pages/contact"
import Workshop from "./pages/workshop"
import DesktopNavbar from "./components/DesktopNavbar"
import Sessions from "./pages/sessions"
import MobileNavbar from "./components/MobileNavbar"
import { useEffect, useState } from "react"


function App() {

	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth)
		}

		window.addEventListener("resize", handleResize)

		return () => window.addEventListener("resize", handleResize)
	})

    return (
		<>
			<BrowserRouter>
				{width < 768 ?
					<MobileNavbar/> 
				:
					<DesktopNavbar />
				}
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/events" element={<Events />}/>
					<Route path="/contact" element={<Contact />}/>
					<Route path="/workshops" element={<Workshop />}/>
					<Route path="/sessions" element={<Sessions />}/>
				</Routes>
			</BrowserRouter>	
		</>
    )
}

export default App

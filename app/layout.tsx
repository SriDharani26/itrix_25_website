import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";

export const metadata: Metadata = {
  title: "Itrix 26",
  description: "Itrix 2026 site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



	return (
		<html lang="en">
			<body>
				<LayoutWrapper>{children}</LayoutWrapper>
			</body>
		</html>
	);
}

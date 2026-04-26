export const projectsData = [
	{
		name: "Playing with the Apple Vision Pro",
		color: "#000",
		shortName: "Vision Pro",
		filter: ["Dev", "Design"],
		description:
			"Exploring spatial computing content pipelines on Apple Vision Pro — from baked 3D models to photorealistic captures and stereoscopic video.",
		imageSrc: "/projectImages/thumbnails/visionOS.webp",
		heroSrc: "/projectImages/hero/swift.webp",
		heroVideo: "/projectImages/hero/visionOS.mp4",
		heroVideoWidth: "50%",
		tags: ["SwiftUI", "RealityKit", "VisionOS"],
		longDescription:
			"A VisionOS app built to explore the four primary content streams available on Apple Vision Pro: CloudXR for streaming RTX-rendered scenes over the network, baked USDZ models for lightweight interactive 3D, Gaussian Splats for photorealistic scene capture, and Spatial MV-HEVC video for immersive stereoscopic playback. Each stream represents a different trade-off between fidelity, interactivity and file size, and this project investigates how they can coexist within a single spatial computing experience.",
		highlights: [
			"Explores four distinct spatial content pipelines within a single VisionOS app",
		],
		data: [
			{
				heading: "Content Streams",
				blockData: [
					{
						name: "Baked USDZ",
						description:
							"Apple's standard format for delivering lightweight, interactive 3D content. Models come pre-baked with materials, lighting and animations — ready for real-time rendering and hand-tracked interaction via RealityKit.",
					},
					{
						name: "NVIDIA CloudXR",
						description:
							"NVIDIA's streaming tech that renders XR content on a remote RTX-powered workstation and streams it to AVP over the network. Unlocks desktop-class graphics fidelity with path-tracing & interactivity — all rendered off-device and streamed to AVP stereoscopically.",
					},
					{
						name: "Gaussian Splats",
						description:
							"A radiance-field technique that reconstructs real-world scenes from photographs into photorealistic volumetric captures. Ideal for faithful scene reproduction where visual fidelity matters more than interactivity.",
					},
					{
						name: "Spatial Video (MV-HEVC)",
						description:
							"Apple's stereoscopic video format, encoding left-eye and right-eye views into a single file. Plays back as immersive 3D content on Vision Pro, delivering a strong sense of depth and presence.",
					},
					{
						name: "SharePlay",
						description:
							"All content streams support SharePlay in two modes — nearby SharePlay for multiple Vision Pro users in the same physical space sharing a synchronised spatial experience, and FaceTime SharePlay for remote participants to explore content together in real time over a call.",
					},
				],
			},
			{
				heading: "Baked USDZ",
				video: "/projectImages/projectInfo/visionpro/baked_usdz_web.mp4",
				blockData: [
					{
						name: "The Scene",
						description:
							"The USDZ scene is a fully furnished apartment baked in Corona Renderer, with pre-computed lighting, shadows and PBR materials. Of the native content streams, USDZ offers the best balance of performance and fidelity — as Apple's native 3D format, RealityKit and Metal can optimise rendering with minimal overhead. Vision Pro's native foveated rendering further helps by focusing GPU work where the user is actually looking, keeping frame rates smooth throughout the experience.",
					},
					{
						name: "Walkable Environment & Spatial Audio",
						description:
							"Users can physically walk through the apartment in their space. The scene is rendered at room scale, allowing natural movement through rooms and around furniture. Spatial audio sources are anchored throughout the scene — ambient sounds, music and environmental audio respond to the user's head position and movement, adding a layer of immersion as they explore.",
					},
					{
						name: "Interior Customisation",
						description:
							"Users can interact with the apartment to edit interior options — swapping furniture, changing materials, adjusting finishes — using hand gestures to tap and select from available configurations. This makes the experience practical for use cases like real estate walkthroughs or interior design previews.",
					},
				],
			},
			{
				heading: "NVIDIA CloudXR",
				video: "/projectImages/projectInfo/visionpro/cloudxr_web.mp4",
				blockData: [
					{
						name: "The Streaming Pipeline",
						description:
							"CloudXR moves rendering off the headset entirely. A workstation with an RTX GPU draws each eye's view at full desktop fidelity, encodes the stereoscopic pair in hardware, and streams it to Vision Pro across the network. In return, Vision Pro sends head pose, eye tracking and hand input back to the host in real time — closing the loop in milliseconds.",
					},
					{
						name: "Unreal Engine 5.7 + OpenXR",
						description:
							"OpenXR is the open standard headsets and XR applications use to talk to each other — head pose, swapchains, input, all flowing through a single runtime interface. CloudXR Server registers itself as that OpenXR runtime on the host, so Unreal Engine 5.7 renders into it as if a local headset were connected. The result, as seen in the video, is a path-traced interactive environment built in UE 5.7, rendered at desktop fidelity on an RTX GPU — in 3D, on AVP.",
					},
					{
						name: "Foveated Streaming",
						description:
							"Foveated streaming uses Vision Pro's eye tracking to reduce bandwidth without affecting perceived image quality. The headset continuously reports gaze direction to the host, and the server encodes each frame at higher fidelity in a region around the user's fovea and progressively lower fidelity toward the periphery. Since we only resolve fine detail in a narrow central cone of our visual field, the reduction in peripheral quality is imperceptible. The result is a significant drop in bandwidth requirements, making full-fidelity RTX streaming viable over Wi-Fi.",
					},
					{
						name: "Pose Prediction & Reprojection",
						description:
							"Streamed frames arrive with some delay, producing motion-to-photon latency — a visible lag between head movement and display. CloudXR addresses this in two stages: the host renders each frame for the pose predicted at display time, and Vision Pro reprojects it on arrival to match the actual pose. Paired with foveated streaming keeping frames small, and a Wi-Fi 7 router on the uncongested 6 GHz band, residual latency drops below perception and the image stays locked in world space.",
					},
				],
			},
			{
				heading: "Gaussian Splats",
				video: "/projectImages/projectInfo/visionpro/splat_web.mp4",
				videoPoster: "/projectImages/projectInfo/visionpro/splat_poster.webp",
				blockData: [
					{
						name: "What are Gaussian Splats",
						description:
							"Traditional 3D captures convert scenes into meshes — polygons with textures mapped on top — and render them through rasterisation. Point clouds improved on this by storing millions of coloured points in 3D space, but each point is small, leaving gaps and noise. Gaussian Splatting builds on the point cloud idea by replacing each point with a 3D blob (Gaussian) that has its own colour, opacity and size. These blobs overlap and blend together, producing a more photorealistic result than traditional rasterised meshes — naturally preserving soft details like reflections, transparency and complex textures that rasterisation tends to lose or approximate.",
					},
					{
						name: "Trade-offs",
						description:
							"Performance on Vision Pro specifically is the main trade off — splats require per-frame depth sorting of millions of Gaussians so they blend correctly, and this is computationally intensive when the headset is constantly tracking head movement. Splats also don't get native foveated rendering the way USDZ content does — the workaround is approximating it by dropping the DPR in peripheral regions where the user isn't looking, but this isn't true foveated rendering and the savings are limited. Because splats are not meshes, there are no surfaces to hit-test against, so direct object manipulation like tapping or dragging doesn't exist in the base format.",
					},
					{
						name: "Capture Sources",
						description:
							"The splats in this project come from three different source types: drone photography of outdoor spaces and landscapes, handheld camera captures of real-world objects and interiors, and renders from 3D CGI scenes. Each source produces a different character of splat — drone captures give expansive environmental scale, camera captures bring intimate real-world detail, and CGI renders allow splats of scenes that don't physically exist.",
					},
					{
						name: "Viewing on Vision Pro",
						description:
							"Splats can be viewed immersively or scaled down to a tabletop perspective. In immersive mode, getting close to the Gaussians exposes artifacts like blurry edges and floating points that clean mesh surfaces don't have. Where splats really work well on AVP is tabletop perspective — scaling a drone-captured landscape or a real-world object down to sit on your desk preserves the photorealistic detail at a natural viewing distance, making it a compelling way to explore captured scenes and environments.",
					},
				],
			},
			{
				heading: "Spatial Video (MV-HEVC)",
				video: "/projectImages/projectInfo/visionpro/mv-hevc_web.mp4",
				blockData: [
					{
						name: "What is MV-HEVC",
						description:
							"MV-HEVC (Multiview High Efficiency Video Coding) is Apple's format for spatial video. It encodes a left-eye and right-eye stream into a single file that plays back as stereoscopic 3D on Vision Pro. HEVC's inter-view prediction encodes only the delta between the two eye views, keeping file sizes manageable despite carrying two perspectives.",
					},
					{
						name: "Capture",
						description:
							"Spatial video can be captured with iPhone 15 Pro and later using the built-in spatial video mode, or with stereoscopic camera rigs for a wider FOV as seen in the video (Canon R5). The low barrier to entry with iPhone capture makes this the most accessible of the three content streams.",
					},
					{
						name: "Playback Experience",
						description:
							"In the app, spatial videos are presented in a floating player window, giving the viewer a strong sense of depth and presence. This format is particularly effective for when the feeling of 'being there' matters most.",
					},
				],
			},
		],
	},
	{
		name: "Air Jordan",
		color: "#000",
		shortName: "Air Jordan",
		filter: "Dev",
		description: "A VisionOS app, coming soon...",
		imageSrc: "/projectImages/thumbnails/jordan.webp",
		heroSrc: "/projectImages/hero/swift.webp",
		tags: ["GSplat", "Visualisation"],
		iframe: true,
		iframeSrc: "/embed/air-jordan/",
	},
	{
		name: "Interactions",
		color: "#000",
		shortName: "Interactions",
		filter: ["Dev", "Design"],
		description: "A collection of Interactions",
		imageSrc: "/projectImages/thumbnails/components.webp",
		tags: ["React", "CSS", "framer"],
		iframe: true,
		iframeSrc: "/embed/components/",
	},
	{
		name: "Rethinking Stage Manager on macOS Ventura",
		color: "#f3f4f6",
		shortName: "Stage Manager",
		filter: "Design",
		description: "Critical Analysis and Redesign",
		imageSrc: "/projectImages/thumbnails/stageManager.webp",
		heroSrc: "/projectImages/hero/stageManager.webp",
		tags: ["Redesign", "Figma", "Concept"],
		href: "/projectImages/projectInfo/stageManager/RethinkingStageManager.pdf",
		buttonCopy: "Download as pdf",
		longDescription:
			"Stage Manager is a feature introduced on macOS Ventura for window management and multitasking. While the current implementation of Stage Manager is aesthetically pleasing, the discoverability of this feature can be a problem for novice users as it does not blend with existing macOS features. This redesign mainly aims to combine stage manager with existing macOS features to improve discoverability for novice users while also enhancing multi-tasking for expert users.",
		highlights: ["Based on macOS Ventura Beta version 2"],
		data: [
			{
				heading: "Current Stage Manager Implementation",
				imageWidth: 75,
				image: "/projectImages/projectInfo/stageManager/edited/frame1.webp",
				blockData: [
					{
						name: "Visibility",
						description:
							"All open apps are moved to the left-hand side of the screen with a 3D perspective & a live preview of each window. The user can click on any of the previewed windows to display the app On-Stage.",
					},
					{
						name: "On-Stage",
						description:
							"These are the apps that are visible on the desktop and being used by the user.",
					},
					{
						name: "Off-Stage",
						description:
							"These are the apps that are not being used by the user and are on the left-hand side of the screen. ",
					},
					{
						name: "Grouped Apps",
						description: "Apps can also be grouped and used on the desktop.",
					},
				],
			},
			{
				heading: "Issues Observed in Stage Manager",
				imageWidth: 100,
				image: "/projectImages/projectInfo/stageManager/edited/frame2.webp",
				blockData: [
					{
						name: "Screen Real estate",
						description:
							"The windows of open apps take up a lot of screen real estate on the left-hand side of the screen. These windows can be moved elsewhere which integrates with existing window management features.",
					},
					{
						name: "Discoveribility",
						description:
							"For a novice user, discovering new features in stage manager can be challenging and does not blend in well with existing macOS features such as minimizing an app or mission control.",
					},
					{
						name: "Low Frame-rates",
						description:
							"Older non-apple silicon-based macs face potential frame-rate issues due to the 3D perspective of the windows having a live preview of the app.",
					},
					{
						name: "No Split-Screen View",
						description:
							"Split-screen cannot be used when two or more apps are grouped in stage manager.",
					},
				],
			},
			{
				heading: "Redesigning Stage Manager",
				imageWidth: 75,
				image: "/projectImages/projectInfo/stageManager/edited/frame3.webp",
				blockData: [
					{
						name: "Incorporating Stage Manager for All User Types",
						description:
							"This redesign mainly aims to combine stage manager with existing features such as minimizing to the dock, mission control & gesture controls to improve discoverability for all types of users. This results in a seamless window management system. There are now 2 ways to use stage manager depending on the user type.",
					},
					{
						name: "Novice Users",
						description:
							"A Novice user generally would not use gestures, mission control, etc and mainly uses the dock for navigation. All open apps are moved to the dock similar to when an app is minimized. Apps are grouped together similar to folders on iOS. ",
					},
				],
			},
			{
				heading: "Stage Manager on the Dock",
				imageWidth: 65,
				image: "/projectImages/projectInfo/stageManager/edited/frame4.webp",
				blockData: [
					{
						name: "Grouping Apps",
						description:
							"Apps can be grouped by dragging open windows into existing app groups & can also be un-grouped using the minus icon. Alternatively, the user can use the context menu.",
					},
					{
						name: "Live Preview",
						description:
							"Left-clicking on the apps/group icon shows a live preview of the app window.",
					},
					{
						name: "Context Menu",
						description:
							"Right-clicking on the app/group brings up a context menu to customise the group. The user can add to the group, ungroup, show On-Stage or quit all apps.",
					},
					{
						name: "Discoveribility",
						description:
							"With stage manager being moved to the dock, discoverability for novice users would improve.",
					},
				],
			},
			{
				heading: "Stage Manager in Mission Control",
				image: "/projectImages/projectInfo/stageManager/edited/frame5.webp",
				blockData: [
					{
						name: "Experienced Users",
						description:
							"An experienced user would generally use gestures and mission control for navigation. All open apps/groups are also visible in mission control. Apps can be grouped by dragging open windows onto other apps. ",
					},
				],
			},
			{
				heading: "Split-Screen View",
				image: "/projectImages/projectInfo/stageManager/edited/frame6.webp",
			},
			{
				heading: "Creating complex Split-Screen Views",
				image: "/projectImages/projectInfo/stageManager/edited/frame7.webp",
				blockData: [
					{
						name: "Using Hot Corners",
						description:
							"Complex grid views can be created by dragging & holding windows to a corner/side (hot corners).",
					},
				],
			},
		],
	},
	{
		name: "Car visualiser",
		color: "#000",
		shortName: "Car Vis",
		filter: "Dev",
		description: "3D Gaussian Splat visualisation of a BMW M3 GTR",
		imageSrc: "/projectImages/thumbnails/bmw.webp",
		tags: ["GSplat", "Visualisation"],
		iframe: true,
		iframeSrc: "/embed/bmw/",
	},
	{
		name: "ml-sharp",
		color: "#000",
		shortName: "ml-sharp",
		filter: "Dev",
		description:
			"Interactive 3D Gaussian Splat experience with scroll-based navigation",
		imageSrc: "/projectImages/thumbnails/sharp.webp",
		tags: ["GSplat", "Visualisation", "ml-sharp"],
		iframe: true,
		iframeSrc: "/embed/ml-sharp/",
	},
	{
		name: "React / SwiftUI Presentation App",
		color: "#000",
		shortName: "React/SwiftUI",
		filter: "Dev",
		description:
			"A React/SwiftUI app built to control multiple screens in an immersive marketing suite and synchronize content across various displays for a seamless, interactive experience.",
		imageSrc: "/projectImages/thumbnails/swift.webp",
		heroSrc: "/projectImages/hero/swift.webp",
		tags: ["SwiftUI", "React", "Xcode"],
		longDescription:
			"This SwiftUI app hosts two web views, each running a separate React app. One app is displayed on the iPad, while the other is shown on an external screen via AirPlay. Instead of relying on external servers or websockets, the apps communicate directly through a SwiftUI-managed JavaScript bridge. State updates from one React app are sent to SwiftUI, which then relays them to the second React app, creating a seamless, local communication loop that improves reliability by removing external dependencies, servers and need for multiple devices.",
		highlights: [
			"Used by my employer for their immersive marketing suites and replacing their websockets based setup.",
		],
		data: [
			{
				heading: "Use Case",
				imageWidth: 100,
				noImageRadius: true,
				image: "/projectImages/projectInfo/swift/frame1.webp",
				blockData: [
					{
						name: "Use Case",
						description:
							"My employer's immersive marketing suites are controlled via a React app on an iPad, known as the `iPad View`. This `iPad View` manages a second React app running on a PC, referred to as the `Screen View`. Communication between these apps was previously handled through a server, creating three points of communication. While functional, this setup introduced reliability concerns and multiple points of potential failure, making it more difficult to debug.",
					},
					{
						name: "The idea",
						description:
							"The idea of this solution was to eliminate the need for multiple devices, apps and websockets. Doing so would simplify the system while significantly improving communication reliability. By running both React apps locally within a SwiftUI app and using a JavaScript bridge for direct communication, the setup minimizes points of failure and packages the entire setup in a single local app.",
					},
				],
			},
			{
				heading: "How it works",
				imageWidth: 100,
				noImageRadius: true,
				image: "/projectImages/projectInfo/swift/frame2.webp",
				blockData: [
					{
						name: "SwiftUI Setup",
						description:
							"The SwiftUI app runs 2 views. The first view is the `iPad view` and the second view is the `Screen View`. The `Screen View` runs as an extended display via Airplay. When the iPad connects to an airplay device, the second 'Screen View` is shown on the screen while the iPad shows the `iPad View`.",
					},
					{
						name: "WebView Setup",
						description:
							"`iPad View` and `Screen View` run their own webview which hosts the respective react app. The SwiftUI app is setup to send javascript events to each of the webviews to communicate state changes.",
					},
					{
						name: "iPad React View",
						description:
							"This react app largely remains unchanged. The zustand store that handles app states, sends a webkit event to the swiftUI app each time a state is updated. The SwiftUI app then relays this message to the `Screen View` react app.",
					},
					{
						name: "Screen React View",
						description:
							"`Screen View` app listens for a javascript events sent by the SwiftUI app to the webview and updates the required states on the `Screen View`.",
					},
				],
			},
			{
				heading: "The End Result",
				imageWidth: 100,
				noImageRadius: true,
				image: "/projectImages/projectInfo/swift/frame3.webp",
				blockData: [
					{
						name: "A Single App",
						description:
							"The end result is a much cleaner setup that runs locally on an iPad. No servers or extra devices (servers, pcs) are needed. The device the iPad airplays to can be a TV Screen, projector or an Apple device. In case of an apple device, the airplay connection is WiFi direct and does not need a WiFi Network. ",
					},
					{
						name: "No extra devices required",
						description:
							"With this setup, the only hardware required is an iPad and an airplay enabled device/screen. Most modern TV's and projectors are airplay enabled. This setup is also easier to debug after being set up in marketing suite or an immersive demo room.",
					},
				],
			},
		],
	},
	{
		name: "Mobility Assist",
		shortName: "Mobility Assist",
		filter: ["Dev"],
		color: "rgb(213, 213, 213)",
		description:
			"A LiDAR powered mobile application for Mobility Assistance for Visually Impaired users",
		imageSrc: "/projectImages/thumbnails/mobility.webp",
		heroSrc: "/projectImages/hero/mobility.webp",
		tags: ["swift", "LiDAR", "ArKit"],
		href: "https://ieeexplore.ieee.org/document/9744605",
		buttonCopy: "View published paper on IEEE",
		longDescription:
			"An accessibility feature/mobile app to provide mobility assistance for the visually impaired using LiDAR. Developed using Swift for real-time 3D construction of the environment with haptic feedback relative to distance from obstacle. Acts as asubstitute for walking canes to improve surrounding accessibility",
		highlights: [
			"Presented at IEEE conference held in Brisbane, Australia",
			"Published in IEEE Xplore",
		],
		data: [
			{
				heading: "The Idea",
				centerImage: true,
				image: "/projectImages/projectInfo/mobility/frame1.webp",
				blockData: [
					{
						name: "Function",
						description:
							"A mobile application which would mainly be a substitute for walking canes for the visually impaired.",
					},
					{
						name: "LiDAR",
						description:
							"Using LiDAR (Light Detection and Ranging), a 3D model of the scanned environment would be constructed in real time.",
					},
					{
						name: "Haptic Feedback",
						description:
							"The user, through haptic feedback, can be aware if an obstacle exists in his view. The frequency of this haptic feedback would be inversely proportional to the distance from the obstacle.",
					},
					{
						name: "Object Recognition",
						description:
							"Using a CNN model, which has an input of the spatial features and depth features of the environment, the user can identify the type of obstacle that exists in their view through synthesized speech.",
					},
				],
			},
			{
				heading: "How it Works",
				centerImage: true,
				image: "/projectImages/projectInfo/mobility/frame2.webp",
				blockData: [
					{
						name: "Step 1: LiDAR",
						description:
							"The LiDAR scanner works on the principle of using light in the form of a pulsed laser to measure ranges. Using these measured ranges, the distance to every single point in the environment can be calculated with respect to the user. Using these distances, a 3D recreation of the environment is obtained.",
					},
					{
						name: "Step 2: Haptic Feedback",
						description:
							"The frequency of the haptic feedback/vibrations on the smartphone will be inversely proportional to the distance from the obstruction. The goal is to create a realistic haptic simulation that keeps the user constantly aware of their proximity to objects and ensures their safety.",
					},
					{
						name: "Step 3: Object Recognition",
						description:
							"By utilizing the 3D mesh, the system can identify the obstacles in the user's path and, if necessary, verbally alert them to the type of hazards through synthesized speech.",
					},
				],
			},
		],
	},
	{
		name: "Path Tracer",
		color: "#000",
		shortName: "Path Tracer",
		filter: "Dev",
		description: "3D car visualiser built with React Three Fiber",
		imageSrc: "/projectImages/thumbnails/pathTracer.webp",
		tags: ["R3F", "Three.js", "Path Tracing"],
		iframe: true,
		iframeSrc: "/embed/path-tracer/",
	},
	{
		name: "KitchenMate",
		shortName: "KitchenMate",
		color: "#000",
		filter: "Design",
		description:
			"An app designed for the amazon echo show to help users cook healthy and sustainable recipes.",
		imageSrc: "/projectImages/thumbnails/kitchenmate.webp",
		heroSrc: "/projectImages/hero/kitchenmate.webp",
		tags: ["IxD", "Figma", "UCD/HCDE"],
		href: "/projectImages/projectInfo/kitchenmate/Report.pdf",
		buttonCopy: "Download Report",
		longDescription:
			"A cooking app designed for the Amazon Echo Show/iPad, making it easier than ever to prepare healthy and sustainable meals. With features like personalized recipe recommendations based on available ingredients, sustainability, and calorie tracking goals, all integrated with smart devices, that allow users to cook healthy meals that align with their goals with ease.",
		highlights: [
			"Part of Interaction Design Group Coursework",
			"Designed using a UCD/HCDE approach following User research, Conceptual design, Detailed design and Evaluation",
		],
		data: [
			{
				heading: "User Research",
				centerImage: true,
				image: "/projectImages/projectInfo/kitchenmate/frame1.webp",
				blockData: [
					{
						name: "Interviews and Observations",
						description:
							"In the initial phase of user research, we conducted interviews and contextual observations to gather insights and better understand the user's needs and behaviors.",
					},
					{
						name: "Affinity Mapping",
						description:
							"By consolidating and grouping the insights from these interviews and contextual observations, we were able to gain a comprehensive understanding of the user's needs and behaviors.",
					},
					{
						name: "Personas",
						description:
							"Leveraging these insights, we created multiple user personas that highlight their unique needs, goals, and frustrations, using POV (point of view) statements.",
					},
					{
						name: "User Journeys",
						description:
							"We created individual user journeys that map out current user experiences and pain points. These user journeys enable us to empathize with our users and design solutions that cater to their unique needs and goals.",
					},
				],
			},
			{
				heading: "Conceptual Design",
				centerImage: true,
				image: "/projectImages/projectInfo/kitchenmate/frame2.webp",
				blockData: [
					{
						name: "Brainstorming",
						description:
							"We conducted a brainstorming session using various ideation techniques such as multiple ideas, worst idea possible, etc, to generate a diverse range of design concepts. After evaluating the ideas based on factors such as feasibility, impact, and user relevance, we selected the best features for the app and organized them into categories.",
					},
					{
						name: "Storyboarding",
						description:
							"To create a compelling vision of how our app could help users in real-world scenarios, we used the insights gathered from user research to develop storyboards. These storyboards depict hypothetical situations and illustrate how users would interact with the app in similar scenarios. This approach allowed us to envision the user experience and refine our design concepts to ensure that they are aligned with the user's needs and goals.",
					},
					{
						name: "Low Fidelity Wireframes",
						description:
							"To facilitate the early stages of the design process and enable quick iterations, we created low-fidelity wireframes on Figma. These wireframes allowed us to explore multiple design concepts quickly and refine them based on user feedback and testing.",
					},
				],
			},
			{
				heading: "Detailed Design - Home Tab",
				image: "/projectImages/projectInfo/kitchenmate/frame3.webp",
				blockData: [
					{
						name: "Home Tab",
						description:
							"The Home tab is designed to provide quick access to frequently used features, enabling users to perform commonly used actions with ease. By consolidating the most frequently used functions into one tab, we aim to enhance the user experience by reducing the time and effort required to navigate the app.",
					},
				],
			},
			{
				heading: "Detailed Design - Recipe Tab",
				image: "/projectImages/projectInfo/kitchenmate/frame4.webp",
				blockData: [
					{
						name: "Recipe Tab",
						description:
							"The Recipe page offers a comprehensive overview of each dish, including a list of ingredients, suggested serving sizes, required equipment, and video tutorials to guide users through each step of the cooking process. Additionally, the app allows users to preview the recipe instructions before beginning to cook, ensuring that they have a clear understanding of the required steps and ingredients.",
					},
				],
			},
			{
				heading: "Detailed Design - While Cooking",
				image: "/projectImages/projectInfo/kitchenmate/frame5.webp",
				blockData: [
					{
						name: "Recipe Tab - While Cooking",
						description:
							"The Recipe page while cooking provides users with a step-by-step guide to cooking a dish, allowing them to easily follow along with the recipe. By presenting detailed instructions in a clear and concise manner, the app aims to make cooking more accessible and enjoyable for users. This feature is particularly useful for novice cooks or those who want to try new recipes but are unfamiliar with certain cooking techniques. The Recipe Detail page also includes helpful tips and tricks to ensure that users achieve the best results possible.",
					},
				],
			},
			{
				heading: "Detailed Design - Pantry Tab",
				image: "/projectImages/projectInfo/kitchenmate/frame6.webp",
				blockData: [
					{
						name: "Pantry Tab",
						description:
							"The Pantry tab allows users to manage the ingredients they have on hand, with expiring items highlighted for easy identification. This feature is especially useful for minimizing food waste and ensuring that users can make the most of the ingredients they have. Based on the ingredients available, the app suggests recipes that users can prepare using the ingredients in their pantry. In addition, the Pantry tab also allows users to add or shop for more ingredients, making it a convenient tool for meal planning and grocery shopping.",
					},
				],
			},
			{
				heading: "Getting Feedback",
				blockData: [
					{
						name: "Evaluation",
						description:
							"To ensure the effectiveness of our design decisions and validate the usability of our product, we conducted user testing with 6 individuals using the prototype we created in Figma. We chose an in-person testing method to provide a more comprehensive assessment of their interactions with the design elements and to be able to quickly identify any issues or difficulties they encountered in navigating through the product. By doing so, we were able to obtain valuable feedback and insights, enabling us to further refine and improve our design in order to provide an optimal user experience.",
					},
				],
			},
		],
	},
	{
		name: "Cerebranium",
		shortName: "Cerebranium",
		color: "#000",
		filter: "Dev",
		description:
			"As an intern in a team to develop Promexa - an online proctored examination platform used by schools in Germany and India. View more on company website",
		imageSrc: "/projectImages/thumbnails/promexa.webp",
		href: "https://cerebranium.com/promexa",
		tags: ["flutter", "internship", "education"],
	},
	{
		name: "Random Tech",
		color: "#000",
		shortName: "Random Tech",
		filter: "Dev",
		description: "Some of the things that i've worked on in the past",
		imageSrc: "/projectImages/thumbnails/randomTech.webp",
		heroSrc: "/projectImages/hero/randomTech.webp",
		tags: ["random", "fun", "Games"],
		longDescription:
			"This is a page that shows some of the random projects that I have worked on in the past. This includes games, apps and other things",
		data: [
			{
				heading: "Body Motion Capture and Object Scanning app",
				image: "/projectImages/projectInfo/random/frame1.webp",
				imageWidth: 100,
				blockData: [
					{
						name: "Purpose",
						description:
							"A mobile application for scanning objects or environments with textures using LiDAR and photogrammetry and body motion capture using machine learning.",
					},
					{
						name: "Real-Time Motion Capture",
						description:
							"Full body motion capture using machine learning with skeletal features which can be used to animate a 3D character model.",
					},
					{
						name: "Photogrammetry",
						description:
							"Scan a room/object’s topological features with textures using LiDAR and photogrammetry and viewing it in AR or exporting it as a 3D model in an .obj file to be used in various 3D editing softwares.",
					},
					{
						name: "Viewing",
						description:
							"Both can either be viewed in AR or be used in rendering tools such as Blender, Cinema 4D, Unity, etc to create 3D model assets and character animations.",
					},
				],
			},
			{
				heading: "Third Person open world game - Unreal Engine 5",
				image: "/projectImages/projectInfo/random/frame2.webp",
				imageWidth: 100,
				blockData: [
					{
						name: "Purpose",
						description:
							"An open-world third person game built using UE5. The open-world sandbox consists of various biomes mainly to explore and use UE5.",
					},
					{
						name: "Effects",
						description:
							"The post processing used include Ambient Occlusion and Screen Spaced Reflections. Lumen could be used in this build of UE5 but macOS does not support hardware accelerated ray-tracing",
					},
					{
						name: "Traversal",
						description:
							"A third person camera controller with basic actions to traverse around the open-world.",
					},
					{
						name: "Nanite",
						description:
							"Nanite based assets were used in this build but the screenshots show a low preset of level of detail.",
					},
				],
			},
			{
				heading: "TourTime - Virtual Tourist Guide",
				image: "/projectImages/projectInfo/random/frame3.webp",
				imageWidth: 100,
				blockData: [
					{
						name: "Function",
						description:
							"This project involves a Mobile Application for identifying landmarks by clicking a picture of a Landmark or Tourist Destination. Winning project at Internal Smart India hackathon ",
					},
					{
						name: "Image processing",
						description:
							"The image will be processed by a Convolutional Neural Network in the Cloud to identify the landmark and then return information about it, as well as other nearby locations.",
					},
					{
						name: "Guided Tour Itinerary",
						description:
							"The standout feature is a Guided Tour Itinerary that will be presented to the user based on frequent tourist visitation patterns and curated to perfection.",
					},
					{
						name: "Community Feedback",
						description:
							"The users of the platform can submit new information about the locations they visit, and these facts will go through a crowd review process.",
					},
				],
			},
			{
				heading: "iOS Wallet App",
				image: "/projectImages/projectInfo/random/frame4.webp",
				imageWidth: 100,
				blockData: [
					{
						name: "Function",
						description:
							"An iOS application which helps users keep track of their transactions daily with friends, stores, etc.",
					},
					{
						name: "How it Works",
						description:
							"The user can add transactions and their details and have them tracked in a transaction log can also add friends to keep track of lent or borrowed money between a friend.",
					},
					{
						name: "CoreData",
						description: "The app uses CoreData to store app data",
					},
				],
			},
		],
	},
	{
		name: "Crisis UK: Usability Evaluation Test",
		shortName: "Usability",
		color: "#fff",
		filter: "Design",
		description:
			"UX evaluation for Crisis.uk website through HCID lab at City, University of London. Click to view report",
		imageSrc: "/projectImages/thumbnails/usability.webp",
		href: "/projectImages/projectInfo/usability.pdf",
		tags: ["HCID", "UX", "Crisis UK"],
	},
];

# PubSubHub 
This project is not production code. It has been developed as a demonstrator.
The PubSubHub.js file adopts a pure (agent-generic) code that enables it to be used in Isomorphic JavaScript mode. This enables the object to be executes within a modern web browser, on JavaScript engines such as NodeJs and Rhino, and online IDEs such as Cloud9 or CodePen (http://codepen.io/TracyGJG/pen/zvroxx).

The two html files are samplers for the PubSubHub object.
PubSubHub.html: Exercises PubSubHub through a series of calls that play-out the following scenario.

Phase 1

TestOne: Publish data and Subscribe (Sub1) to Topic (TestOne) - Report data to display.

TestTwo: Subscribe (Sub2 and Sub3) and Publish data to both using Topic (TestTwo) - Report data twice.

TestOne/Two: Subscript (Sub4) to both Topics (TestOne and TestTwo) - Report of data from both Topics.

Phase 2

TestOne Update 1: Publish more data to Topic (TestOne) - Data reported twice.

TestOne Update 2: Unsubscribe (Sub4) from Topic (TestTwo). Publish more data to Topic (TestOne) - Reported to just Sub1.

TestTwo Clear: Publish nothing to Topic (TestTwo), Subscribe (Sub5) to Topic (TestTwo) - Nothing reported.

TestTwo Update: Publish data to Topic (TestTwo) - Three reports issued.

PubSubHubUI.html: Presents the user with three tables with Yellow, Cyan and Lime backgrounds.
Each table consists of an input text field above two table-data (td) elements.
The input fields represent data producers and the tds represent data consumers, one for each of the other tables.
The producers are registered as Topic Publishers (Y,C & L) respectively. The consumers register as Topic Subcscribers (YC, YL, CY, CL, LY & LC).
By typing in the text fields the TD's are populated with the same data, in a simple data binding manner but wil multiple (two) output for each input. It is technically feasible to a register more that 1 data producer as a Publisher a single Topic.

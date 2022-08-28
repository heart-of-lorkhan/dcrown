import UIkit from "./api/index";
import Core from "./core/core";
import boot from "./api/boot";
import Parallax from "./components/parallax";
import { each } from "./util/lang";

// register components
// each(components, (component, name) =>
UIkit.component("parallax", Parallax);
// );
//
// core functionality
UIkit.use(Core);

boot(UIkit);

export default UIkit;

import { container } from "tsyringe";

import BCryptHashProvider from "./HashProvider/implementations/BCryptHashProvider";
import IHashProvider from "./HashProvider/models/IHashProvider";
import JWTokenProvider from "./Token/implementations/JWTokenProvider";
import ITokenProvider from "./Token/models/ITokenProvider";

container.registerSingleton<IHashProvider>("HashProvider", BCryptHashProvider);
container.registerSingleton<ITokenProvider>("JWTProvider", JWTokenProvider);

import { TextureLoader, NearestFilter, RepeatWrapping } from 'three'

// Simple base64 textures for a Minecraft feel (pixel art)
// Dirt
const dirtBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJklEQVQYV2NkwAT/gZgRiH9B+QwMOPTAgEySUQvE40IwmWQQHwYAGuUMRbeuK5UAAAAASUVORK5CYII=";
// Grass top
const grassBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAALUlEQVQYV2NkYGD4z8DAwMgAA0xIHOyA8QwM2BTBFeCSh0nCFGEzCKcBWT8DACHzBxxuCqZtAAAAAElFTkSuQmCC";

const dirtTexture = new TextureLoader().load(dirtBase64)
const grassTexture = new TextureLoader().load(grassBase64)

// Make them pixelated!
dirtTexture.magFilter = NearestFilter
dirtTexture.minFilter = NearestFilter
dirtTexture.wrapS = RepeatWrapping
dirtTexture.wrapT = RepeatWrapping

grassTexture.magFilter = NearestFilter
grassTexture.minFilter = NearestFilter
grassTexture.wrapS = RepeatWrapping
grassTexture.wrapT = RepeatWrapping

export { dirtTexture, grassTexture }

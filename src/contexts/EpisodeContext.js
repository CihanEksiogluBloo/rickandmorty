import createDataContext from "./createDataContext";
import rmApi from "../api/rmApi";

const episodeReducer = (state, action) => {
  switch (action.type) {
    case "fetch_episodes":
      return { ...state, episodes: action.payload };
    case "fetch_episode_detail":
      return { ...state, episodeDetail: action.payload };
    case "reset_episode_detail":
      return { ...state, episodeDetail: action.payload };
    case "fetch_episode_characters":
      return { ...state, episodeCharacters: action.payload };
    case "reset_episode_characters":
      return { ...state, episodeCharacters: action.payload };
    case "fetch_character":
      return { ...state, character: action.payload };
    case "reset_character":
      return { ...state, character: action.payload };
    default:
      return state;
  }
};

const fetchEpisodes = (dispatch) => async (page) => {
  try {
    const response = await rmApi.get(`/episode?${page.page}`);
    dispatch({ type: "fetch_episodes", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

const fetchEpisodeDetail = (dispatch) => async (episodeNumber) => {
  try {
    const response = await rmApi.get(`/episode/${episodeNumber}`);
    dispatch({ type: "fetch_episode_detail", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

const resetEpisodesDetail = (dispatch) => () => {
  dispatch({ type: "reset_episode_detail", payload: [] });
};

const fetchEpisodeCharacters = (dispatch) => async (ids) => {
  try {
    if (ids) {
      const characterids = [];
      for (const i of ids) {
        characterids.push(i.split("/")[i.split("/").length - 1]);
      }

      const response = await rmApi.get(`/character/${characterids}`);
      dispatch({ type: "fetch_episode_characters", payload: response.data });
    }
  } catch (error) {
    console.log(error);
  }
};

const resetEpisodeCharacters = (dispatch) => () => {
  dispatch({ type: "reset_episode_characters", payload: [] });
};

const fetchCharacter = (dispatch) => async (id) => {
  try {
    if (id) {
      const response = await rmApi.get(`/character/${id}`);
      dispatch({ type: "fetch_character", payload: response.data });
    }
  } catch (error) {
    console.log(error);
  }
};

const resetCharacter = (dispatch) => () => {
  dispatch({ type: "reset_character", payload: [] });
};

export const { Provider, Context } = createDataContext(
  episodeReducer,
  {
    fetchEpisodes,
    fetchEpisodeDetail,
    fetchEpisodeCharacters,
    fetchCharacter,
    resetEpisodesDetail,
    resetCharacter,
    resetEpisodeCharacters,
  },
  {
    episodes: [],
    episodeDetail: [],
    episodeCharacters: [],
    character: [],
  }
);

import FakePostsRepository from "../infra/typeorm/repositories/fakes/FakePostsRepository";
import { GetPostsServices } from "./GetPostsService";

let fakePostsRepository: FakePostsRepository;
let getPostsServices: GetPostsServices;

describe("GetPostsService", () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    getPostsServices = new GetPostsServices(fakePostsRepository);
  });

  it("should be able to list all posts", async () => {
    const register = await fakePostsRepository.create({
      user_id: "1",
      content: "Test",
    });

    const register2 = await fakePostsRepository.create({
      user_id: "1",
      content: "Test 2",
    });

    const response = await getPostsServices.execute({ page: 1 });

    expect(response).toHaveProperty("page");
    expect(response).toHaveProperty("totalPages");
    expect(response).toHaveProperty("posts");
  });
});

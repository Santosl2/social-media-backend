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
      content: "Test",
    });

    const register2 = await fakePostsRepository.create({
      content: "Test 2",
    });

    const response = await getPostsServices.execute({ page: 1 });

    expect(response).toEqual(
      expect.arrayContaining([
        { id: register.id, content: "Test" },
        { id: register2.id, content: "Test 2" },
      ]),
    );
  });
});

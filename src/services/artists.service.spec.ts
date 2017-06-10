import { ArtistInterface, ArtistsService } from './artists.service';

describe('First Test Suite', () => {

  console.log('hello!!!!!>>>>>>>>>');

  it('should test ArtistService exists', () => {
    expect(ArtistsService).toBeDefined();
  });

});
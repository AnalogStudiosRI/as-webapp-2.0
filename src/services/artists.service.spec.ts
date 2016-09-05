import { ArtistInterface, ArtistsService } from './artists.service';

describe('First Test Suite', () => {

  it('should test ArtistInterface', () => {
    let artist: ArtistInterface = {
      id: 1,
      name: 'Super Cat',
      bio: 'Band bio'
    };

    expect(artist.name).toEqual('Super Cat');
  });

  it('should test ArtistService toBeDefined', () => {
    expect(ArtistsService).toBeDefined();
  });

});
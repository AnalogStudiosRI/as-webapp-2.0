'use strict';

import { ArtistInterface } from './artists.service';

describe('First Test Suite', () => {

  it('should pass', () => {
    let artist: ArtistInterface = {
      id: 1,
      name: 'Super Cat',
      bio: 'This bio'
    };

    expect(artist.name).toEqual('Super Cat');
  });

});
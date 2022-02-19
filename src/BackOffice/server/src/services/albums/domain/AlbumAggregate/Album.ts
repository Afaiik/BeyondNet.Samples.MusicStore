import { AlbumId } from './AlbumId';
import { AlbumName } from './AlbumName';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { AuditValueObject } from '../../../shared/domain/valueobjects';
import AlbumDomainException from './AlbumDomainException';
import Author from './Author';
import Song from './Song';
import SongDomainException from './SongDomainException';
import { AlbumDescription } from './AlbumDescription';
import { AlbumCreatedDomainEvent } from './events';
import { Tag } from './Tag';

export enum EAlbumStatus {
  Pending,
  InLab,
  Closed,
  Canceled
}

export const EAlbumStatusTranslate = {
  [EAlbumStatus.Pending]: 'Pending',
  [EAlbumStatus.InLab]: 'InLab',
  [EAlbumStatus.Closed]: 'Closed',
  [EAlbumStatus.Canceled]: 'Canceled'
};

class Album extends AggregateRoot {
  readonly id: AlbumId;
  readonly name: AlbumName;
  readonly description: AlbumDescription;
  readonly registerDate: Date;
  readonly author: Author;
  readonly tags: Tag[];
  readonly songs: Song[];
  audit: AuditValueObject;
  status: EAlbumStatus;

  private constructor(
    id: AlbumId,
    name: AlbumName,
    description: AlbumDescription,
    author: Author,
    tags: Tag[]
  ) {
    super();

    const registerDate = new Date();

    this.id = id;
    this.name = name;
    this.description = description;
    this.author = author;
    this.tags = tags;
    this.registerDate = registerDate;
    this.songs = [];
    this.audit = AuditValueObject.Create(this.author.authorId);
    this.status = EAlbumStatus.Pending;
  }

  public static Create(
    id: AlbumId,
    name: AlbumName,
    description: AlbumDescription,
    author: Author,
    tags: Tag[]
  ): Album {
    const album = new Album(id, name, description, author, tags);

    album.AddDomainEvent(
      new AlbumCreatedDomainEvent({
        id: album.id.value,
        name: album.name.value,
        description: album.description.value,
        registerDate: album.registerDate,
        author: album.author.authorId
      })
    );

    return album;
  }

  public Promote() {
    if (this.status !== EAlbumStatus.Pending)
      this.StatusChangeException(EAlbumStatus.InLab);

    this.status = EAlbumStatus.InLab;
    this.audit = this.audit.Update(this.author.authorId);
  }

  public Cancel() {
    if (this.status !== EAlbumStatus.Pending)
      this.StatusChangeException(EAlbumStatus.Canceled);

    this.status = EAlbumStatus.Canceled;
    this.audit = this.audit.Update(this.author.authorId);
  }

  public AddTag(tag: Tag): void {
    if (this.ExistsTag(tag))
      throw new AlbumDomainException(`Tag ${tag.value} exists`);

    this.tags.push(tag);
  }

  public RemoveTag(tag: Tag): void {
    if (!this.ExistsTag(tag))
      throw new AlbumDomainException(`Tag ${tag.value} does not exists`);

    this.tags.splice(
      this.tags.findIndex((p) => p.value === tag.value),
      1
    );
  }

  public AddSong(
    id: string,
    name: string,
    description: string,
    duration: number,
    durationFormatted: string,
    tags: string[],
    author: Author
  ): void {
    if (this.ExistsSong(name))
      throw new SongDomainException(`Song ${name} exists`);

    const song = Song.Create(
      id,
      name,
      description,
      duration,
      durationFormatted,
      tags,
      author
    );

    this.songs.push(song);
  }

  public RemoveSong(song: Song): void {
    const name = song.name;

    if (!this.ExistsSong(name))
      throw new AlbumDomainException(`Song ${name} does not exists`);

    this.songs.splice(
      this.songs.findIndex((p) => p.name.toLowerCase() === name.toLowerCase()),
      1
    );
  }

  private ExistsTag(tag: Tag): boolean {
    const tagFound = this.tags.find((t) => t.value === tag.value);

    return tagFound !== null ? true : false;
    
  }

  private ExistsSong(name: string): boolean {
    return this.songs.find((p) => p.name.toLowerCase() === name.toLowerCase())
      ? true
      : false;
  }

  private StatusChangeException(albumStatusToChange: EAlbumStatus) {
    throw new AlbumDomainException(
      `Is not possible to change the album status from ${
        EAlbumStatusTranslate[this.status]
      } to ${EAlbumStatusTranslate[albumStatusToChange]}`
    );
  }

  static fromPrimitives(plainData: {
    id: string;
    name: string;
    description: string;
    author: string;
    duration: string;
    tags: string[];
  }): Album {
    const TagsPrimitive = plainData.tags.map((tag) => new Tag(tag));

    return new Album(
      new AlbumId(plainData.id),
      new AlbumName(plainData.name),
      new AlbumDescription(plainData.description),
      Author.Create(plainData.author, '', ''),
      TagsPrimitive
    );
  }

  toPrimitives(): unknown {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      registerDate: this.registerDate,
      author: this.author,
      tags: this.tags
    };
  }
}

export default Album;

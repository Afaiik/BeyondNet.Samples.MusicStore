import { AggregateRoot, Audit } from '../../../shared/domain';
import Author from './Author';
import FileReference from './File';
import SongDomainException from './SongDomainException';

export enum ESongStatus {
  Pending,
  InLab,
  Canceled,
  Closed
}

export const ESongStatusTranslate = {
  [ESongStatus.Pending]: 'Pending',
  [ESongStatus.InLab]: 'InLab',
  [ESongStatus.Canceled]: 'Canceled',
  [ESongStatus.Closed]: 'Closed'
};

class Song extends AggregateRoot {
  private _id: string;
  private _name: string;
  private _description: string;
  private _registerDate: Date;
  private _duration: number;
  private _author: Author;
  private _tags: string[];
  private _files: FileReference[];
  private _audit: Audit;
  private _status: ESongStatus;

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public get registerDate(): Date {
    return this._registerDate;
  }

  public get duration(): number {
    return this._duration;
  }

  public get author(): Author {
    return this._author;
  }

  public get tags(): string[] {
    return this._tags;
  }

  public get files(): FileReference[] {
    return this._files;
  }

  public get audit(): Audit {
    return this._audit;
  }

  public get status(): ESongStatus {
    return this._status;
  }

  private constructor(
    id: string,
    name: string,
    description: string,
    duration: number,
    durationFormatted: string,
    tags: string[],
    author: Author
  ) {
    super();

    const registerDate = new Date();

    this._id = id;
    this._name = name;
    this._description = description;
    this._registerDate = registerDate;
    this._duration = duration;
    this._tags = tags;
    this._author = author;
    this._files = [];
    this._audit = Audit.Create(this._author.authorId);
    this._status = ESongStatus.Pending;
  }

  public static Create(
    id: string,
    name: string,
    description: string,
    duration: number,
    durationFormatted: string,
    tags: string[],
    author: Author
  ): Song {
    return new Song(
      id,
      name,
      description,
      duration,
      durationFormatted,
      tags,
      author
    );
  }

  public Promote() {
    if (this._status !== ESongStatus.Pending)
      this.StatusChangeException(ESongStatus.InLab);

    this._status = ESongStatus.InLab;
    this._audit = this._audit.Update(this._author.authorId);
  }

  private StatusChangeException(songStatusToChange: ESongStatus) {
    throw new SongDomainException(
      `Is not possible to change the album status from ${
        ESongStatusTranslate[this._status]
      } to ${ESongStatusTranslate[songStatusToChange]}`
    );
  }

  public Cancel() {
    if (
      this._status !== ESongStatus.InLab &&
      this._status !== ESongStatus.Pending
    )
      this.StatusChangeException(ESongStatus.Canceled);

    this._status = ESongStatus.Canceled;
    this._audit = this._audit.Update(this._author.authorId);
  }

  private ExistsTag(tag: string): boolean {
    return (
      this._tags.find((p) => p.toLowerCase() === tag.toLowerCase()) !== '' ??
      false
    );
  }

  public AddTag(tag: string): void {
    if (this.ExistsTag(tag)) throw new SongDomainException(`Tag ${tag} exists`);

    this._tags.push(tag);
  }

  public RemoveTag(tag: string): void {
    if (!this.ExistsTag(tag))
      throw new SongDomainException(`Tag ${tag} does not exists`);

    this._tags.splice(
      this._tags.findIndex((p) => p.toLowerCase() === tag.toLowerCase()),
      1
    );
  }

  public AddFile(name: string, path: string): void {
    if (this.ExistsFile(path))
      throw new SongDomainException(`File ${path} exists`);

    this._files.push(FileReference.Create(name, path));
  }

  public RemoveFile(file: FileReference): void {
    const name = file.name;

    if (!this.ExistsFile(file.name))
      throw new SongDomainException(`File ${name} does not exists`);

    this._files.splice(
      this._files.findIndex(
        (p) => p.path.toLowerCase() === file.path.toLowerCase()
      ),
      1
    );
  }

  private ExistsFile(path: string): boolean {
    return (
      this._files.find((p) => p.path.toLowerCase() === path.toLowerCase()) !==
        null ?? false
    );
  }
}

export default Song;

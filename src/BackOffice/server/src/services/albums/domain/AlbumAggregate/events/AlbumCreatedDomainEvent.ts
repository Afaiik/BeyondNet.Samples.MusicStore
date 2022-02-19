import { DomainEvent } from '../../../../shared/domain';

type CreateAlbumDomainEventBody = {
  readonly id: string;
  readonly eventName: string;
  readonly name: string;
  readonly description: string;
  readonly registerDate: Date;
  readonly author: string;
};

class AlbumCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'album.created';

  readonly name: string;
  readonly description: string;
  readonly registerDate: Date;
  readonly author: string;

  constructor({
    id,
    name,
    description,
    registerDate,
    author,
    eventId,
    occurredOn
  }: {
    id: string;
    eventId?: string;
    name: string;
    description: string;
    registerDate: Date;
    author: string;
    occurredOn?: Date;
  }) {
    super(AlbumCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

    this.name = name;
    this.description = description;
    this.registerDate = registerDate;
    this.author = author;
  }

  toPrimitive(): CreateAlbumDomainEventBody {
    const { name, description, registerDate, author, aggregateId } = this;
    return {
      name,
      description,
      registerDate,
      author,
      eventName: AlbumCreatedDomainEvent.EVENT_NAME,
      id: aggregateId
    };
  }

  static fromPrimitives(
    aggregateId: string,
    body: CreateAlbumDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new AlbumCreatedDomainEvent({
      id: aggregateId,
      name: body.name,
      description: body.description,
      registerDate: body.registerDate,
      author: body.author,
      eventId,
      occurredOn
    });
  }
}

export default AlbumCreatedDomainEvent;

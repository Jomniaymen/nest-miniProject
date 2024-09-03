import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getModelToken } from '@nestjs/mongoose';
import { Order } from './order.schema';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Orderdto } from './dto/order.dto';


const mockOrder = {
  _id: 'someOrderId',
  customerName: 'helllooo',
  orderDate: new Date('2024-09-02T15:55:57.238Z'),
  products: [],
};


const mockPopulate = jest.fn().mockResolvedValue(mockOrder);


const mockOrderModel = {
  create: jest.fn().mockResolvedValue(mockOrder),
  findById: jest.fn().mockReturnValue({
    populate: mockPopulate,
  }),
  find: jest.fn().mockReturnValue({
    populate: mockPopulate,
  }),
  findByIdAndUpdate: jest.fn().mockReturnValue({
    populate: mockPopulate,
  }),
  findByIdAndDelete: jest.fn().mockResolvedValue(mockOrder),
};

describe('OrdersService', () => {
  let service: OrdersService;
  let model: Model<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getModelToken(Order.name),
          useValue: mockOrderModel,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    model = module.get<Model<Order>>(getModelToken(Order.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProduct', () => {
    it('should create a new order', async () => {
      const dto: Orderdto = {
        customerName: 'helllooo',
        orderDate: new Date('2024-09-02T15:55:57.238Z'),
        products: [],
      };
      const result = await service.createProduct(dto);
      expect(result).toEqual(mockOrder);
      expect(model.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('getProductById', () => {
    it('should return an order by id with populated products', async () => {
      const result = await service.getProductById('someOrderId');
      expect(result).toEqual(mockOrder);
      expect(model.findById).toHaveBeenCalledWith('someOrderId');
      expect(mockPopulate).toHaveBeenCalledWith('products');
    });

    it('should throw a NotFoundException if order is not found', async () => {
      jest.spyOn(model, 'findById').mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
      } as any);
      await expect(service.getProductById('someOrderId')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getallpro', () => {
    it('should return all orders with populated products', async () => {
        const mockOrder= {
            _id: 'someOrderId',
            customerName: 'helllooo',
            orderDate: new Date('2024-09-02T15:55:57.238Z'),
            products: [],
          };
      const result = await service.getallpro();
      expect(result).toEqual(mockOrder);
      expect(model.find).toHaveBeenCalled();
      expect(mockPopulate).toHaveBeenCalledWith('products');
    });
  });

  describe('updateProduct', () => {
    it('should update an order by id with populated products', async () => {
      const dto: Orderdto = {
        customerName: 'helllooo',
        orderDate: new Date('2024-09-02T15:55:57.238Z'),
        products: [],
      };
      const result = await service.updateProduct('someOrderId', dto);
      expect(result).toEqual(mockOrder);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith('someOrderId', dto, { new: true });
      expect(mockPopulate).toHaveBeenCalledWith('products.productid');
    });
  });

  describe('deleteProduct', () => {
    it('should delete an order by id', async () => {
      const result = await service.deleteProduct('someOrderId');
      expect(result).toEqual(mockOrder);
      expect(model.findByIdAndDelete).toHaveBeenCalledWith('someOrderId');
    });
  });
});

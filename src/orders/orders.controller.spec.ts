import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Orderdto } from './dto/order.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';


const mockOrder = {
  _id: 'someOrderId',
  customerName: 'test product',
  orderDate: new Date(),
  
  products: [],
};

const mockOrderDto: Orderdto = {
    customerName: 'test product',
    orderDate: new Date(),
    products: [],

};

const mockOrdersService = {
  createProduct: jest.fn().mockResolvedValue(mockOrder),
  getallpro: jest.fn().mockResolvedValue([mockOrder]),
  getProductById: jest.fn().mockResolvedValue(mockOrder),
  updateProduct: jest.fn().mockResolvedValue(mockOrder),
  deleteProduct: jest.fn().mockResolvedValue(mockOrder),
};

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: mockOrdersService,
        },
      ],
    })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProduct', () => {
    it('should create a new order', async () => {
      const result = await controller.createoreder(mockOrderDto);
      expect(result).toEqual(mockOrder);
      expect(service.createProduct).toHaveBeenCalledWith(mockOrderDto);
    });
  });

  describe('getAllProducts', () => {
    it('should return all orders', async () => {
      const result = await controller.getAllOrders();
      expect(result).toEqual([mockOrder]);
      expect(service.getallpro).toHaveBeenCalled();
    });
  });

  describe('getProductById', () => {
    it('should return an order by id', async () => {
      const result = await controller.getOrderById('someOrderId');
      expect(result).toEqual(mockOrder);
      expect(service.getProductById).toHaveBeenCalledWith('someOrderId');
    });
  });

  describe('updateProduct', () => {
    it('should update an order by id', async () => {
      const result = await controller.updateOrder('someOrderId', mockOrderDto);
      expect(result).toEqual(mockOrder);
      expect(service.updateProduct).toHaveBeenCalledWith('someOrderId', mockOrderDto);
    });
  });

  describe('deleteProduct', () => {
    it('should delete an order by id', async () => {
      const result = await controller.deleteOrder('someOrderId');
      expect(result).toEqual(mockOrder);
      expect(service.deleteProduct).toHaveBeenCalledWith('someOrderId');
    });
  });
});

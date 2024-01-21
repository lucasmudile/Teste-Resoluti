using AutoMapper;
using Domain.Entities;
using Microsoft.Extensions.Options;
using Moq;
using Resoluti.Application.DTOs;
using Resoluti.Application.Interfaces.Repositories;
using Resoluti.Application.Interfaces.Services;
using Resoluti.Application.Services;

namespace Resoluti.UnitTests
{
    public class LoginTests
    {
        private Mock<IUserRepository> _userRepository;
        private IUserService _userService;
        private readonly IMapper _mapper;

        [SetUp]
        public void Setup()
        {
            _userRepository = new Mock<IUserRepository>(MockBehavior.Strict);
            _userService = new UserService(_userRepository.Object);
        }

        [Test]
        public void Login_Sucesso()
        {
            // Arrange
            var mockContactRepository =  _userRepository.Setup(p => p.Login("lucas@gmail.com", "Abc123!"));

            var login = new UserLogin
            {
                Email = "lucas@gmail.com",
                Password = "Abc123!"
            };

            //Act
            var loginResponse = _userService.Login(login);
            // Assert
            Assert.IsNotNull(loginResponse);
        }


        [Test]
        public void Login_Falhou()
        {
            // Arrange
            _userRepository.Setup(p => p.Login("lu@gmail.com", "12")).ReturnsAsync((User)null);

            var login = new UserLogin
            {
                Email = "lu@gmail.com",
                Password = "12"
            };

            // Act
            var loginResponse = _userService.Login(login).Result;

            // Assert
            Assert.IsFalse(loginResponse.Succeeded); // Verifica se a operação não foi bem-sucedida
            Assert.AreEqual("Usuário ou Senha Incorreta", loginResponse.Message);
            Assert.IsNull(loginResponse.Data);
        }



    }
}